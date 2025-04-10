import DynamicShowList from "../components/DynamicShowList"; // Import the wrapper component

export const metadata = {
  title: "Upcoming Shows | The Fool's Guild", // Updated title
  description: "See all upcoming shows from The Fool's Guild.", // Updated description
};

export default function ShowsPage() {
  return (
    // Standardized to max-w-7xl, added pt-24 for spacing below header
    <div className="max-w-7xl mx-auto py-12 px-4 pt-24">
      {/* Using Klein font, uppercase, light-teal text */}
      <h1 className="text-3xl md:text-5xl font-klein uppercase font-bold text-light-teal text-center mb-12">
        Upcoming Shows
      </h1>
      <DynamicShowList /> {/* Use the wrapper component */}
    </div>
  );
}
