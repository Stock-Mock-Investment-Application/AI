import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CharacterCard from '../components/CharacterCard'; // Assuming CharacterCard component is defined correctly
import { Tag } from '../components/Tag'; // Assuming Tag component is defined correctly

// Importing images
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';
import img4 from '../images/img4.jpg';
import img5 from '../images/img5.jpg';
import img6 from '../images/img6.jpg';
import img7 from '../images/img7.jpg';
import img8 from '../images/img8.jpg';

interface Character {
    id: number;
    name: string;
    description: string;
    imagePath: string; // New property for image path
}

const MyCharPage: React.FC = () => {
    const navigate = useNavigate();
    const characters: Character[] = [
        { id: 1, name: "LeonHeart", description: "A gallant blonde knight in armor", imagePath: img1 },
        { id: 2, name: "Lina", description: "A cute elementary school boy who loves playing the piano", imagePath: img2 },
        { id: 3, name: "Elena", description: "A fierce warrior with silver hair", imagePath: img3 },
        { id: 4, name: "Gerald", description: "A wise old wizard with a magical staff", imagePath: img4 },
        { id: 5, name: "Sylvia", description: "An adventurous archaeologist searching for lost treasures", imagePath: img5 },
        { id: 6, name: "Xavier", description: "A mysterious spy skilled in infiltration", imagePath: img6 },
        { id: 7, name: "Zara", description: "A tech-savvy engineer with a knack for inventions", imagePath: img7 },
        { id: 8, name: "Olivia", description: "A charming diplomat with a silver tongue", imagePath: img8 }
    ];

    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

    const handleCharacterClick = (character: Character) => {
        setSelectedCharacter(character);
    };

    const handleGoToAIPainting = () => {
        navigate('../AIPaintingPage');
    };

    return (
        <>
            <button
                onClick={handleGoToAIPainting}
                style={{ backgroundColor: 'blue', color: 'white', padding: '10px', cursor: 'pointer' }}
            >
                AI Painting으로 이동
            </button>

            <br />
            <h2>캐릭터 목록</h2>
            <Tag />
            <br />
            <div className="character-list">
                {characters.map((character) => (
                    <CharacterCard
                        key={character.id}
                        name={character.name}
                        description={character.description}
                        imagePath={character.imagePath} // Pass imagePath to CharacterCard
                        onClick={() => handleCharacterClick(character)}
                    />
                ))}
            </div>
            {/* 선택된 캐릭터 정보를 오른쪽에 표시 */}
            <div className="character-details">
                {selectedCharacter && (
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={selectedCharacter.imagePath} /> {/* Display image */}
                        <Card.Body>
                            <Card.Title>{selectedCharacter.name}</Card.Title>
                            <Card.Text>{selectedCharacter.description}</Card.Text>
                        </Card.Body>
                    </Card>
                )}
            </div>
            <br />
        </>
    );
};

export default MyCharPage;
