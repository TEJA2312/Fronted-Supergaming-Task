export default function ButtonType ({ label, type, wrapperClass }) {
 return(
      <button
        type={type}
        className= {`${wrapperClass} block font-medium border-none text-white w-fit px-8 py-3 text-sm rounded-md border-2 bg-gradient-to-r from-teal-400 to-blue-400 hover:scale-[1.02] cursor-pointer`}
      >
        { label }
      </button>
 )
}