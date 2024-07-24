import { Tag } from "../components/Tag";
import CharacterCard from "../components/CharacterCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Character {
    id: number;
    name: string;
    description: string;
}

const MyCharPage: React.FC = () => {
    const navigate = useNavigate();
    const characters: Character[] = [
        { id: 1, name: "LeonHeart", description: "A gallant blonde knight in armor" },
        { id: 2, name: "Lina", description: "A cute elementary school boy who loves playing the piano" },
        { id: 3, name: "Elena", description: "A fierce warrior with silver hair" },
        { id: 4, name: "Gerald", description: "A wise old wizard with a magical staff" },
        { id: 5, name: "Sylvia", description: "An adventurous archaeologist searching for lost treasures" },
        { id: 6, name: "Xavier", description: "A mysterious spy skilled in infiltration" },
        { id: 7, name: "Zara", description: "A tech-savvy engineer with a knack for inventions" },
        { id: 8, name: "Olivia", description: "A charming diplomat with a silver tongue" }
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

         
            <br/>
            <h2>캐릭터 목록</h2>
            <Tag/>
            <br/>
            <div className="character-list">
                {characters.map((character) => (
                    <CharacterCard
                        key={character.id}
                        name={character.name}
                        description={character.description}
                        onClick={() => handleCharacterClick(character)} // 클릭 이벤트 핸들러 추가
                    />
                ))}
            </div>
            {/* 선택된 캐릭터 정보를 오른쪽에 표시 */}
            <div className="character-details">
                {selectedCharacter && (
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{selectedCharacter.name}</Card.Title>
                            <Card.Text>{selectedCharacter.description}</Card.Text>
                        </Card.Body>
                    </Card>
                )}
            </div>
            <br/>
        </>
    );
};

export default MyCharPage;
