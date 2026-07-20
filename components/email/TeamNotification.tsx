import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";

interface Props {
  fullName: string;
  email: string;
  country: string;
  state: string;
  businessType: string;
}

export default function TeamNotification({
  fullName,
  email,
  country,
  state,
  businessType,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>
        New Waitlist Signup
      </Preview>

      <Body
        style={{
          background: "#f8fafc",
          fontFamily: "Arial",
        }}
      >
        <Container
          style={{
            background: "#fff",
            padding: "40px",
          }}
        >
          <Heading>
            New Waitlist Signup
          </Heading>

          <Text>
            <strong>Name:</strong> {fullName}
          </Text>

          <Text>
            <strong>Email:</strong> {email}
          </Text>

          <Text>
            <strong>Business:</strong>{" "}
            {businessType}
          </Text>

          <Text>
            <strong>Country:</strong>{" "}
            {country}
          </Text>

          <Text>
            <strong>State:</strong> {state}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}