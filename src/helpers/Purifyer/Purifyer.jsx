import DOMPurify from 'dompurify';




function Purifyer ({ gameInfo }) {
    // Extract the description from gameInfo
    const description = gameInfo && gameInfo.description ? gameInfo.description : '';

    // Sanitize the HTML content
    const sanitizedHTML = DOMPurify.sanitize(description);

    // Use dangerouslySetInnerHTML to render sanitized HTML content
    return (
        <div>
            <h2>Game Description</h2>
            <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
        </div>
    );
}

export default Purifyer;