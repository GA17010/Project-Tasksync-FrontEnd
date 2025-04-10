import SectionProjets from "./section/SectionProjects"
import SectionUser from "./section/SectionUser"

function DashboardPage() {
  return (
    <>
      <div className="w-full h-full flex flex-col md:flex-row px-2 sm:px-4 md:px-6 lg:px-12 py-4 ">
        <section className="md:w-2/6 p-4 flex flex-col">
          <SectionUser />
        </section>

        <section className="md:w-4/6 p-4 flex flex-col justify-start">
          <SectionProjets />
        </section>
      </div>
    </>
  )
}

export default DashboardPage
