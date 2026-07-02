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

const colors = {
  bg: "#0f0f14",
  surface: "#1a1a24",
  border: "#2a2a38",
  accent: "#7c6af7",
  accentLight: "#a89cf8",
  text: "#e8e6f0",
  textMuted: "#8b8a9b",
  danger: "#f87171",
  success: "#4ade80",
  warning: "#fbbf24",
};

export function ReminderDigestEmail({ userName, reminders, appUrl }: ReminderDigestEmailProps) {
  const count = reminders.length;

  return (
    <Html lang="en">
      <Head>
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
          backgroundColor: colors.bg,
          fontFamily: "Inter, Arial, sans-serif",
          margin: 0,
          padding: "24px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            backgroundColor: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {/* ── Header ── */}
          <Section
            style={{
              background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`,
              padding: "32px 32px 24px",
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            <Text
              style={{
                margin: 0,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase" as const,
                color: colors.accentLight,
              }}
            >
              NotHired · Daily Digest
            </Text>
            <Heading
              as="h1"
              style={{
                margin: "8px 0 4px",
                fontSize: "24px",
                fontWeight: 700,
                color: colors.text,
                lineHeight: 1.3,
              }}
            >
              You have {count} reminder{count !== 1 ? "s" : ""} due today
            </Heading>
            <Text
              style={{
                margin: 0,
                fontSize: "14px",
                color: colors.textMuted,
              }}
            >
              Hey {userName}, here&apos;s your morning job search check-in.
            </Text>
          </Section>

          {/* ── Reminders List ── */}
          <Section style={{ padding: "24px 32px" }}>
            {reminders.map((reminder, idx) => (
              <Section
                key={reminder.id}
                style={{
                  backgroundColor: colors.bg,
                  border: `1px solid ${colors.border}`,
                  borderLeft: `3px solid ${colors.accent}`,
                  borderRadius: "8px",
                  padding: "16px 18px",
                  marginBottom: idx < reminders.length - 1 ? "12px" : 0,
                }}
              >
                {/* Company + Role */}
                <Text
                  style={{
                    margin: "0 0 4px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: colors.accentLight,
                    letterSpacing: "0.2px",
                  }}
                >
                  {reminder.application.companyName} · {reminder.application.roleTitle}
                </Text>

                {/* Message */}
                <Text
                  style={{
                    margin: "0 0 8px",
                    fontSize: "14px",
                    color: colors.text,
                    lineHeight: 1.5,
                  }}
                >
                  {reminder.message}
                </Text>

                {/* Due date */}
                <Text
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    color: colors.textMuted,
                  }}
                >
                  📅{" "}
                  {new Date(reminder.dueDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
              </Section>
            ))}
          </Section>

          <Hr style={{ borderColor: colors.border, margin: "0 32px" }} />

          {/* ── CTA ── */}
          <Section style={{ padding: "24px 32px" }}>
            <Link
              href={`${appUrl}/reminders`}
              style={{
                display: "inline-block",
                backgroundColor: colors.accent,
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                letterSpacing: "0.3px",
              }}
            >
              View All Reminders →
            </Link>
            <Text
              style={{
                margin: "16px 0 0",
                fontSize: "12px",
                color: colors.textMuted,
                lineHeight: 1.6,
              }}
            >
              This is a daily digest from NotHired. You&apos;ll only receive one email per day even
              if you have multiple reminders due.
            </Text>
          </Section>

          {/* ── Footer ── */}
          <Section
            style={{
              backgroundColor: "#0a0a10",
              padding: "16px 32px",
              borderTop: `1px solid ${colors.border}`,
            }}
          >
            <Text
              style={{
                margin: "0 0 8px",
                fontSize: "11px",
                color: colors.textMuted,
                textAlign: "center" as const,
              }}
            >
              NotHired · Your job search, tracked.
            </Text>
            <Text
              style={{
                margin: "0 0 8px",
                fontSize: "11px",
                color: colors.textMuted,
                textAlign: "center" as const,
              }}
            >
              123 Startup Ave, Suite 100, San Francisco, CA 94107
            </Text>
            <Text
              style={{
                margin: 0,
                fontSize: "11px",
                color: colors.textMuted,
                textAlign: "center" as const,
              }}
            >
              Don&apos;t want to receive these daily digests?{" "}
              <Link
                href={`${appUrl}/settings`}
                style={{ color: colors.accentLight, textDecoration: "underline" }}
              >
                Unsubscribe here
              </Link>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ReminderDigestEmail;
