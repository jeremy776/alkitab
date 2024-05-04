import AlkitabList from "@/components/Alkitab/AlkitabList";
export default function Home() {
  return (
    <main className="pt-2">
      <div className="grid grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-3 xl:px-20 px-3 pb-20 ">
        <AlkitabList />
      </div>
    </main>
  );
}

