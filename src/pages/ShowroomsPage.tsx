import { PageBanner } from "@/components/shared/PageBanner";
import { ShowroomsSection } from "@/components/sections/ShowroomsSection";
import { SHOWROOMS } from "@/constants";

export function ShowroomsPage() {
  return (
    <>
      <PageBanner title="Showrooms" breadcrumb="Home > Showrooms" />
      <ShowroomsSection showrooms={SHOWROOMS} />
    </>
  );
}
