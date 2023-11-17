import DOMPurify from 'dompurify';




function Purifyer ({ gameInfo }) {
    const description = gameInfo && gameInfo.description ? gameInfo.description : '';
    const sanitizedHTML = DOMPurify.sanitize(description);

    return (
        <div>
            <h2>Game Description</h2>
            <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
        </div>
    );
}

export default Purifyer;