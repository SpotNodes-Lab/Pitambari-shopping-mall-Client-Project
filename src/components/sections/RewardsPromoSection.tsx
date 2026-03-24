import styled from "styled-components";
import { QRCodeCanvas } from "qrcode.react";

export function RewardsPromoSection() {
  return (
    <Section>
      <Container>
        <Badge>Rewards</Badge>
        <Title>Rewards QR</Title>
        <Subtext>
          Scan this QR to open the rewards page. This is a demo section with static QR and text.
        </Subtext>
        <QrWrap>
          <QRCodeCanvas value={`${window.location.origin}/rewards/scan`} size={170} includeMargin />
        </QrWrap>
        <Caption>Point your camera to scan and open rewards.</Caption>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  background: #f7faf9;
  padding: 2.5rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
`;

const Badge = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--color-primary);
  margin-bottom: 0.65rem;
  font-size: 0.8rem;
  font-weight: 600;
`;

const Title = styled.h2`
  font-size: clamp(1.7rem, 3vw, 2.5rem);
  margin-bottom: 0.8rem;
  font-family: "Playfair Display", "Baskerville", serif;
`;

const Subtext = styled.p`
  max-width: 720px;
  margin: 0 auto 1.25rem;
  color: rgba(0, 0, 0, 0.7);
`;

const QrWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.3rem 0 0.6rem;
`;

const Caption = styled.p`
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.9rem;
`;
