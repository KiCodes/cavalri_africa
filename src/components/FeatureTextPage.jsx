import { usePageTitle } from '../hooks/usePageTitle';
import './FeatureTextPage.css';

const IMAGE_WIDTHS = [400, 600, 700, 800, 900, 1000, 1200];

function buildSrcSet(imageBase, ext) {
  return IMAGE_WIDTHS.map((w) => `${imageBase}${w}x${ext} ${w}w`).join(', ');
}

function FeatureTextPage({ heading, imageBase, imageExt = '.jpg', paragraphs }) {
  usePageTitle(heading);

  return (
    <section className="FeatureText FeatureText--withImage FeatureText--imageLeft">
      <div className="FeatureText__ImageWrapper">
        <div className="AspectRatio">
          <img
            src={`${imageBase}800x${imageExt}`}
            srcSet={buildSrcSet(imageBase, imageExt)}
            sizes="(min-width: 641px) 50vw, 100vw"
            alt=""
          />
        </div>
      </div>

      <div className="FeatureText__ContentWrapper">
        <div className="FeatureText__Content">
          <header className="SectionHeader">
            <h1 className="SectionHeader__Heading Heading u-h1">{heading}</h1>
            <div className="SectionHeader__Description Rte">
              {paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </header>
        </div>
      </div>
    </section>
  );
}

export default FeatureTextPage;
