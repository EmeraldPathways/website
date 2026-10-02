const videos = [
  {
    title: "Whiskey social media video",
    src: "https://www-ccv.adobe.io/v1/player/ccv/3ocHm_Xw9Hn/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View",
  },
  {
    title: "Picadice social media video",
    src: "https://www-ccv.adobe.io/v1/player/ccv/PPtK5XVuDIN/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View",
  },
];

export function VideoGallery() {
  return (
    <div className="media-grid video-grid">
      {videos.map((video) => (
        <iframe
          key={video.src}
          title={video.title}
          src={video.src}
          loading="lazy"
          allow="autoplay; fullscreen"
        />
      ))}
    </div>
  );
}
