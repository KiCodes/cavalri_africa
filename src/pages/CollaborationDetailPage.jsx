import { Link, Navigate, useParams } from 'react-router-dom';
import { COLLABORATIONS } from '../data/collaborations';
import { usePageTitle } from '../hooks/usePageTitle';
import './CollaborationDetailPage.css';

const SHARE_ICONS = [
  {
    name: 'Facebook',
    path: 'M13 21v-8h3l1-4h-4V7c0-1.1.3-2 2-2h2V1.1C16.6 1 15.3 1 13.9 1 10.9 1 9 2.8 9 6.2V9H6v4h3v8h4z',
  },
  {
    name: 'Twitter',
    path: 'M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.6 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.6 3.3 4a4.2 4.2 0 0 1-1.8.1c.5 1.6 2 2.8 3.8 2.8A8.3 8.3 0 0 1 2 18.6 11.6 11.6 0 0 0 8.3 20.5c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z',
  },
  {
    name: 'Pinterest',
    path: 'M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-1.8.3-2.7l1.5-6.3s-.4-.8-.4-1.9c0-1.8 1-3.1 2.3-3.1 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.7-1 4.2-.3 1.2.6 2.2 1.8 2.2 2.2 0 3.7-2.8 3.7-6.1 0-2.5-1.7-4.4-4.8-4.4-3.5 0-5.7 2.6-5.7 5.5 0 1 .3 1.7.8 2.3.2.3.3.4.2.7l-.3 1c0 .3-.3.4-.6.3-1.5-.6-2.2-2.3-2.2-4.1 0-3.1 2.6-6.8 7.8-6.8 4.2 0 6.9 3 6.9 6.3 0 4.3-2.3 7.5-5.8 7.5-1.2 0-2.3-.6-2.6-1.4l-.8 3c-.2.9-.7 1.9-1.1 2.6A10 10 0 1 0 12 2z',
  },
];

function CollaborationDetailPage() {
  const { slug } = useParams();
  const index = COLLABORATIONS.findIndex((collab) => collab.slug === slug);
  const collab = COLLABORATIONS[index];

  usePageTitle(collab ? collab.title : 'Collaborations');

  if (!collab) {
    return <Navigate to="/collaborations" replace />;
  }

  const next = COLLABORATIONS[(index + 1) % COLLABORATIONS.length];

  return (
    <article className="CollabDetail">
      <div className="AspectRatio CollabDetail__Hero">
        <img src={collab.coverImage} alt={collab.title} />
      </div>

      <div className="CollabDetail__Bar">
        <span className="CollabDetail__NowReading u-h8">
          Now Reading: <strong>{collab.title}</strong>
        </span>

        <div className="CollabDetail__Share">
          <span className="u-h8">Share</span>
          {SHARE_ICONS.map((icon) => (
            <a href="#" key={icon.name} aria-label={icon.name}>
              <svg viewBox="0 0 24 24">
                <path d={icon.path} fill="currentColor" />
              </svg>
            </a>
          ))}
        </div>

        <Link to={`/collaborations/${next.slug}`} className="CollabDetail__Next u-h8">
          Next
          <svg viewBox="0 0 11 18">
            <path
              d="M1.5 1.5l8 7.5-8 7.5"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="square"
            />
          </svg>
        </Link>
      </div>

      <div className="Container CollabDetail__Body">
        <div className="Rte">
          {collab.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="CollabDetail__Gallery">
          {collab.gallery.map((src) => (
            <div className="AspectRatio" key={src}>
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default CollaborationDetailPage;
