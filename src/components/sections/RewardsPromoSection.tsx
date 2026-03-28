import styled from "styled-components";
import { QRCodeCanvas } from "qrcode.react";
import {
  DEFAULT_REWARDS_QR_CAPTION,
  type RewardsQrBlock,
} from "@/services/cmsApi";

type Props = {
  blocks?: RewardsQrBlock[];
};

export function RewardsPromoSection({ blocks = [] }: Props) {
  const scanUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/rewards/scan`
      : "/rewards/scan";

  if (blocks.length > 0) {
    return (
      <Section>
        <Container>
          <Stack>
            {blocks.map((b) => (
              <Block key={b.id}>
                <Badge>Rewards</Badge>
                <Title>{b.title}</Title>
                <Subtext>
                  Scan the code to open the linked page. You can also tap the image.
                </Subtext>
                <QrWrap>
                  <QrLink href={b.link} target="_blank" rel="noopener noreferrer">
                    <QrImage src={b.image} alt="" width={200} height={200} loading="lazy" />
                  </QrLink>
                </QrWrap>
                <Caption>{b.description}</Caption>
              </Block>
            ))}
          </Stack>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <Badge>Rewards</Badge>
        <Title>Rewards QR</Title>
        <Subtext>
          Scan this QR to open the rewards page. Add an active QR block in the admin CMS to replace
          this with your uploaded image and caption.
        </Subtext>
        <QrWrap>
          <QRCodeCanvas value={scanUrl} size={170} includeMargin />
        </QrWrap>
        <Caption>{DEFAULT_REWARDS_QR_CAPTION}</Caption>
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

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: center;
`;

const Block = styled.div`
  max-width: 640px;
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

const QrLink = styled.a`
  display: inline-block;
  line-height: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  }
`;

const QrImage = styled.img`
  display: block;
  width: 200px;
  height: 200px;
  object-fit: contain;
  background: #fff;
`;

const Caption = styled.p`
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.9rem;
`;
