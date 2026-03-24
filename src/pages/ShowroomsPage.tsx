import { PageBanner } from "@/components/shared/PageBanner";
import { ShowroomsSection } from "@/components/sections/ShowroomsSection";
import { SHOWROOMS } from "@/constants";

export function ShowroomsPage() {
  return (
    <>
      <PageBanner title="Our Businesses" breadcrumb="Home > Our Businesses" />
      <ShowroomsSection showrooms={SHOWROOMS} />
    </>
  );
}
