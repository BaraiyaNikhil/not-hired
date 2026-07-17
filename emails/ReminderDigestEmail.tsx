import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Link,
  Font,
  Img,
} from "@react-email/components";
import * as React from "react";

interface DigestReminderItem {
  id: string;
  message: string;
  dueDate: Date;
  application: {
    companyName: string;
    roleTitle: string;
  };
}

interface ReminderDigestEmailProps {
  userName: string;
  reminders: DigestReminderItem[];
  appUrl: string;
}

// ── Chalk & Board palette (mirrors globals.css :root / .dark vars) ──────────
const c = {
  board: "#2a3439", // chalkboard bg
  boardDark: "#1e272b", // deeper shade for header / footer
  boardCard: "#334049", // slightly lighter card bg
  frame: "#5a4b3c", // wood-frame border
  chalk: "rgba(255,255,255,0.90)", // primary text
  chalkDim: "rgba(255,255,255,0.55)", // muted text
  chalkFaint: "rgba(255,255,255,0.14)", // subtle divider/border
  red: "#ef4444", // logo red accent (CTA, left bars)
  redSoft: "#fca5a5", // soft red for labels
};

export function ReminderDigestEmail({ userName, reminders, appUrl }: ReminderDigestEmailProps) {
  const count = reminders.length;

  return (
    <Html lang="en">
      <Head>
        {/* Caveat — gives a hand-written / chalk-sketch feel for the brand name */}
        <Font
          fontFamily="Caveat"
          fallbackFontFamily="Georgia"
          webFont={{
            url: "https://fonts.gstatic.com/s/caveat/v17/WnznHAc5bAfYB2QRah7pcpNvOx-pjcB9eIWpZQ.woff2",
            format: "woff2",
          }}
          fontWeight={700}
          fontStyle="normal"
        />
        {/* Inter — body text */}
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Body
        style={{
          backgroundColor: "#18222a",
          fontFamily: "Inter, Arial, sans-serif",
          margin: 0,
          padding: "32px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            backgroundColor: c.board,
            // wood-frame style outer border — matches --board-border
            border: `3px solid ${c.frame}`,
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {/* ── Header ────────────────────────────────────────── */}
          <Section
            style={{
              backgroundColor: c.boardDark,
              padding: "28px 32px 22px",
              borderBottom: `1px solid ${c.chalkFaint}`,
              textAlign: "center",
            }}
          >
            {/* Logo */}
            <Img
              src={`${appUrl}/Logo.png`}
              alt="NotHired"
              width={52}
              height={52}
              style={{ display: "inline-block", marginBottom: "10px" }}
            />

            {/* Brand — Caveat gives the chalk-sketch look */}
            <Text
              style={{
                margin: "0 0 4px",
                fontSize: "26px",
                fontWeight: 700,
                fontFamily: "Caveat, Georgia, serif",
                color: c.chalk,
                letterSpacing: "1px",
              }}
            >
              NotHired
            </Text>

            {/* Sub-label */}
            <Text
              style={{
                margin: 0,
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "2.5px",
                textTransform: "uppercase" as const,
                color: c.chalkDim,
              }}
            >
              Daily Reminder Digest
            </Text>
          </Section>

          {/* ── Greeting ──────────────────────────────────────── */}
          <Section style={{ padding: "28px 32px 4px" }}>
            <Heading
              as="h1"
              style={{
                margin: "0 0 10px",
                fontSize: "20px",
                fontWeight: 700,
                color: c.chalk,
                lineHeight: 1.35,
              }}
            >
              Hey {userName} 👋
            </Heading>
            <Text
              style={{
                margin: 0,
                fontSize: "14px",
                color: c.chalkDim,
                lineHeight: 1.65,
              }}
            >
              You have{" "}
              <span style={{ color: c.redSoft, fontWeight: 600 }}>
                {count} reminder{count !== 1 ? "s" : ""}
              </span>{" "}
              due today. Here&apos;s your morning job-search check-in.
            </Text>
          </Section>

          {/* ── Reminder cards ────────────────────────────────── */}
          <Section style={{ padding: "20px 32px 8px" }}>
            {reminders.map((reminder, idx) => (
              <Section
                key={reminder.id}
                style={{
                  backgroundColor: c.boardCard,
                  // chalk-style red left bar — mirrors the logo's red slash
                  borderLeft: `3px solid ${c.red}`,
                  borderRadius: "3px",
                  padding: "14px 16px",
                  marginBottom: idx < reminders.length - 1 ? "10px" : 0,
                }}
              >
                {/* Company · Role */}
                <Text
                  style={{
                    margin: "0 0 5px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: c.redSoft,
                    letterSpacing: "0.6px",
                    textTransform: "uppercase" as const,
                  }}
                >
                  {reminder.application.companyName} &middot; {reminder.application.roleTitle}
                </Text>

                {/* Reminder message */}
                <Text
                  style={{
                    margin: "0 0 8px",
                    fontSize: "14px",
                    color: c.chalk,
                    lineHeight: 1.55,
                  }}
                >
                  {reminder.message}
                </Text>

                {/* Due date */}
                <Text
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    color: c.chalkDim,
                  }}
                >
                  Due:{" "}
                  {new Date(reminder.dueDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
              </Section>
            ))}
          </Section>

          {/* ── Chalk-dust divider ────────────────────────────── */}
          <Hr
            style={{
              borderColor: c.chalkFaint,
              margin: "24px 32px 0",
            }}
          />

          {/* ── CTA ───────────────────────────────────────────── */}
          <Section style={{ padding: "24px 32px" }}>
            <Link
              href={`${appUrl}/reminders`}
              style={{
                display: "inline-block",
                backgroundColor: c.red,
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                padding: "11px 26px",
                borderRadius: "3px",
                letterSpacing: "0.3px",
              }}
            >
              Open My Reminders &rarr;
            </Link>

            <Text
              style={{
                margin: "14px 0 0",
                fontSize: "12px",
                color: c.chalkDim,
                lineHeight: 1.65,
              }}
            >
              You&apos;ll receive at most one digest per day — all your due reminders are batched
              into this single email.
            </Text>
          </Section>

          {/* ── Footer ────────────────────────────────────────── */}
          <Section
            style={{
              backgroundColor: c.boardDark,
              padding: "14px 32px",
              borderTop: `1px solid ${c.chalkFaint}`,
            }}
          >
            <Text
              style={{
                margin: "0 0 6px",
                fontSize: "11px",
                color: c.chalkDim,
                textAlign: "center" as const,
              }}
            >
              NotHired &middot; Your job search, tracked.
            </Text>
            <Text
              style={{
                margin: 0,
                fontSize: "11px",
                color: c.chalkDim,
                textAlign: "center" as const,
              }}
            >
              Don&apos;t want daily digests?{" "}
              <Link
                href={`${appUrl}/settings`}
                style={{ color: c.chalkDim, textDecoration: "underline" }}
              >
                Unsubscribe here
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ReminderDigestEmail;
