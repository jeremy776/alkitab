import Footer from "@/components/footer";

export default function Container({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <div className="items-center justify-center w-full flex 2xl:py-60 py-20">
      <div className="max-w-7xl w-full h-full items-center flex p-5">
        {children}
      </div>
    </div>
    <Footer />
    </>
  )
}