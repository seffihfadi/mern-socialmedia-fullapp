
const Empty = ({text = 'No data found !', icon = 'rainbow', type = 'sm'}) => {
  return (
    <>
      {type === 'lg' ? 
        <div className="flex flex-col justify-center items-center py-2">
          <i className={`uil uil-${icon} text-[120px]`}></i>
          <p className='text-center text-[#434343] max-w-sm'>{text}</p>
        </div>
      :
        <div className="flex items-center gap-3 py-4">
          <i className={`uil uil-${icon} text-[30px]`}></i>
          <p className='text-[#434343]'>{text}</p>
        </div>
      }
    </>
  )
}

export default Empty