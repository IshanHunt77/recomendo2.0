interface Props {
    movieLabel: string;
    link: string;
}

export const MovieCardComponent: React.FC<Props> = ({ movieLabel, link }) => {
    return (
        <div className="justify-center text-center w-64 rounded-lg bg-orange-500 border-red-200 overflow-hidden shadow-lg">
            {/* Set a fixed height with object-cover to keep images uniform */}
            <img 
                src={link} 
                alt={movieLabel} 
                className="rounded-t-lg w-full h-80 object-cover" 
            />
            <div className="text-container mt-2 p-3">
                <p className="font-sm text-white text-base truncate">{movieLabel}</p>
            </div>
        </div>
    );
}
