import { Link } from 'react-router-dom';
import { COLLABORATIONS } from '../data/collaborations';
import { usePageTitle } from '../hooks/usePageTitle';
import './CollaborationsPage.css';

function CollaborationsPage() {
  usePageTitle('Collaborations');

  return (
    <section className="PageHeader">
      <div className="Container">
        <div className="SectionHeader SectionHeader--center">
          <h1 className="SectionHeader__Heading Heading u-h1">Collaborations</h1>
        </div>

        <div className="CollabGrid">
          {COLLABORATIONS.map((collab) => (
            <Link to={`/collaborations/${collab.slug}`} className="CollabGrid__Item" key={collab.slug}>
              <div className="AspectRatio">
                <img src={collab.coverImage} alt={collab.title} loading="lazy" />
              </div>
              <p className="CollabGrid__Title Heading u-h6">{collab.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CollaborationsPage;
