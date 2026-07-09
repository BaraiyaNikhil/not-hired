"use client";

import { Application, Contact } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash, Users } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import {
  deleteApplicationAction,
  changeApplicationStatusAction,
} from "@/actions/application.actions";
import { toast } from "sonner";
import { useApplicationStore } from "@/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactList } from "../contact/ContactList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type AppWithContacts = Application & { contacts: Contact[] };

export function ApplicationList({ applications }: { applications: AppWithContacts[] }) {
  const { setEditingApp, contactsApp, setContactsApp } = useApplicationStore();

  const { execute: deleteApp } = useAction(deleteApplicationAction, {
    onSuccess: () => toast.success("Application deleted"),
    onError: (e) => toast.error(e.error.serverError || "Failed to delete"),
  });

  const { execute: changeStatus } = useAction(changeApplicationStatusAction, {
    onSuccess: () => toast.success("Status updated"),
    onError: (e) => toast.error(e.error.serverError || "Failed to update status"),
  });

  const currentContactsApp = contactsApp
    ? applications.find((a) => a.id === contactsApp.id) || contactsApp
    : null;

  return (
    <div className="bg-black/20 border border-white/20 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">{app.companyName}</TableCell>
              <TableCell>{app.roleTitle}</TableCell>
              <TableCell>
                <Select
                  defaultValue={app.status}
                  onValueChange={(val) =>
                    changeStatus({
                      id: app.id,
                      status: val as
                        | "applied"
                        | "screening"
                        | "interview"
                        | "offer"
                        | "rejected"
                        | "ghosted",
                    })
                  }
                >
                  <SelectTrigger className="w-[130px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="screening">Screening</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="ghosted">Ghosted</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="capitalize">{app.source.replace("_", " ")}</TableCell>
              <TableCell suppressHydrationWarning>
                {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : "-"}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setContactsApp(app)}>
                      <Users className="mr-2 h-4 w-4" />
                      Contacts ({app.contacts.length})
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setEditingApp(app)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this application?")) {
                          deleteApp({ id: app.id });
                        }
                      }}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {applications.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No applications found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={!!contactsApp} onOpenChange={(open) => !open && setContactsApp(null)}>
        <DialogContent className="md:max-w-2xl lg:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Contacts for {currentContactsApp?.companyName}</DialogTitle>
            <DialogDescription className="sr-only">
              List of contacts for the application.
            </DialogDescription>
          </DialogHeader>
          {currentContactsApp && <ContactList application={currentContactsApp} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
