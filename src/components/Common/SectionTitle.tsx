const SectionTitle = ({
  title,
  paragraph,
  width = "570px",
  center,
  mb = "100px",
}: {
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
  mb?: string;
}) => {
  return (
    <>
      <div
        className={`w-full ${center ? "mx-auto text-center" : ""}`}
        style={{ maxWidth: width, marginBottom: mb }}
      >
        <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:text-xl lg:text-2xl">
          {paragraph}
        </p>
      </div>
    </>
  );
};

export default SectionTitle;
