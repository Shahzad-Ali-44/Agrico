import { Testimonial } from "@/types/testimonial";
import Image from "next/image";
const starIcon = (
  <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
    <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
  </svg>
);

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  const { star, name, image, content, designation } = testimonial;

  let ratingIcons = [];
  for (let index = 0; index < star; index++) {
    ratingIcons.push(
      <span key={index} className="text-yellow-400">
        {starIcon}
      </span>,
    );
  }

  return (
    <div className="w-full group h-full">
      <div className="relative h-full flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-r from-lime-500 to-green-500 rounded-2xl blur opacity-10 sm:opacity-20 group-hover:opacity-20 sm:group-hover:opacity-30 transition-opacity duration-300"></div>
        
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-gray-700/50 sm:backdrop-blur-sm flex flex-col h-full">
          <div className="mb-4 flex items-center space-x-1">
            {ratingIcons}
          </div>
          
          <div className="mb-6 flex-1">
            <svg className="w-8 h-8 text-lime-500 mb-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
              {content}
            </p>
          </div>
          
          <div className="flex items-center pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
            <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full ring-2 ring-lime-500/20">
              <Image src={image} alt={name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {designation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTestimonial;
