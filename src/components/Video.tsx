export function Video({ source }: { source: string }) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <video muted controls preload="auto" autoPlay playsInline loop className="max-w-full max-h-full object-contain">
        <source src={source} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}