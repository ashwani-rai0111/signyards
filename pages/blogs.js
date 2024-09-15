import Image from "next/image";

function BlogPage() {
  return (
    <div className="bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-4xl mx-auto">
        <article className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">
            Quality Signage Solutions at Signyards
          </h2>
          <p className="mb-4">
            We at signyards use bestest quality raw materials, in order to
            provide quality in signboards. Our manufacturer’s workshop team can
            fabricate your signages and they’ll also help you to mount them on
            your store!
          </p>
          <p className="mb-4">
            We hold an expertise in following signage types that we fabricate in
            our gurgaon workshop
          </p>
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">
            ACP Fascia cut backlit signage.
          </h2>
          <p className="mb-4">
            These types of signages are Sharp and Elegant and require less
            maintenance. CNC Router cut signage requires lesser maintenance as
            there is little room for dust and water. Laser beam cut-out on an
            opaque sheet makes way for the light to come out at a sharp straight
            angle so that the other façade elements of the signage are totally
            invisible if there is no external light reflecting off its surface.
          </p>
          <p className="mb-4">
            Signyards follow highest quality standards while fabricating
            signages. Click the link below and get an instant quote for your
            signage……
          </p>
          <div className="mb-6">
            <img
              className="w-full h-auto rounded-lg shadow-lg"
              src="/assets/Blog1.jpg"
              alt="Signage Example"
              width={800}
              height={600}
            />
          </div>
          <p className="mb-4">
            Burger singh acrylic fascia cut backlit illuminated sign installed
            at jaipur by www.signyards.com
          </p>
        </article>

        <article className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">
            Full Acrylic Box Backlit Illuminated Signage
          </h2>
          <p className="mb-4">
            Full Acrylic box backlit illuminated signage. These are unique kinds
            of signage and very similar to flex backlit sign boards. These are
            made using 5mm acrylic of any color and then we make an acrylic box
            by raising it around 3” to 5”. We use IP 65 grade Led modules to
            give durable lights. In base we use an ACP sheet.
          </p>
          <p className="mb-4">
            Signyards follow highest quality standards while fabricating
            signages.
          </p>
          <img
            className="w-full h-auto rounded-lg shadow-lg"
            src="/assets/Blog3.jpg"
            alt="Signage Example"
            width={800}
            height={600}
          />
        </article>

        <article className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">
            3D Aluminium Channel Front Acrylic Illuminated Lit Letters
          </h2>
          <p className="mb-4">
            3d Aluminium channel front acrylic illuminated lit letters
          </p>
          <p className="mb-4">
            3d Liquid Acrylic illuminated letters Liquid acrylic as the face,
            Aluminum strip as the return, Various color, Suitable for outdoor
            using, A long life span
          </p>
          <img
            className="w-full h-auto rounded-lg shadow-lg"
            src="/assets/Blog2.jpg"
            alt="Signage Example"
            width={800}
            height={600}
          />
        </article>

        <article className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">
            Our Expertise and Future Plans
          </h2>

          <p className="mb-4">
            We are Fabricating and crafting quality led signages for brands from
            last seven years under our company name Ayaan Sales.
          </p>
          <p className="mb-4">
            We are a group of Technicians, Marketing professionals, Installation
            Team who make it possible to make any signage and get them installed
            at your place of business perfectly.
          </p>
          <p className="mb-4">
            Future Add on : We are building this integrated web portal
            (www.signyards.com) where it will be easy to find signage products
            and services at one place.
          </p>
          <p className="mb-4">
            According to ChamberofCommerce.com, customers are more likely to
            purchase from a business they have already heard of, so a sign can
            help plant the seed for future sales.
          </p>
          <p className="mb-4">
            Exterior illuminated signs draw attention to your place of business
            and help customers find it easily on the street.
          </p>
        </article>

        <footer className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col items-center">
            <img
              className="-m-1.5 p-1.5 h-16 w-auto"
              src="/assets/logo2.jpg"
              alt="Company Logo"
              width={150}
              height={50}
            />
            <p className="text-center mt-4">
              Signyards is an online marketplace of signage and advertising
              solutions in India.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default BlogPage;
