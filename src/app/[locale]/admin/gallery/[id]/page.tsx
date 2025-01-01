import EditGallery from "@/components/pages/admin/gallery/edit";

const GalleryEditPage = ({ params }: { params: { id: string } }) => {
  return <EditGallery id={params.id} />;
};

export default GalleryEditPage;
