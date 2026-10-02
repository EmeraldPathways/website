import { publicAsset } from "@/lib/site-path";

const videos = [
  {
    title: "Whiskey video",
    src: "https://www-ccv.adobe.io/v1/player/ccv/3ocHm_Xw9Hn/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View",
  },
  {
    title: "Picadice video",
    src: "https://www-ccv.adobe.io/v1/player/ccv/PPtK5XVuDIN/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View",
  },
];

export function VideoGallery() {
  return (
    <div className="video-gallery">
      <img src={publicAsset("assets/social_video_pair.png")} alt="Video previews showing a whiskey pour and a Picadice social media post" />
      <div className="video-links" aria-label="Social media videos">
        {videos.map((video) => (
          <a key={video.src} href={video.src} target="_blank" rel="noopener noreferrer">
            Watch {video.title} <span>(opens in a new tab)</span>
          </a>
        ))}
      </div>
    </div>
  );
}
