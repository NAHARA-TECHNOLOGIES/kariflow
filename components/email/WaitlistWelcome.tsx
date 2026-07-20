import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface Props {
  fullName: string;
}

export default function WaitlistWelcome({
  fullName,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>
        Welcome to the Kariflow Waitlist
      </Preview>

      <Body
        style={{
          background: "#f8fafc",
          fontFamily: "Arial",
        }}
      >
        <Container
          style={{
            background: "#ffffff",
            padding: "40px",
            borderRadius: "12px",
          }}
        >
          <Heading
            style={{
              color: "#005B41",
            }}
          >
            Welcome to Kariflow 🎉
          </Heading>

          <Section>
            <Text>Hi {fullName},</Text>

            <Text>
              Thank you for joining the Kariflow
              waitlist.
            </Text>

            <Text>
              You're officially among the first
              people who will experience Kariflow.
            </Text>

            <Text>
              We'll notify you as soon as early
              access becomes available.
            </Text>

            <Text>
              We can't wait to help you simplify
              the way you run your fashion
              business.
            </Text>

            <Text>
              — The Kariflow Team
            </Text>

            <Text
              style={{
                color: "#666",
                fontSize: "12px",
              }}
            >
              Powered by Nahara Technologies
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}