interface ChildProps {
  name?: string;
  age?: number;
  hobby?: string;
}

const Card = ({ name, age, hobby }: ChildProps) => {
  return (
    <>
      <div>
        <p>{name}</p>
        <p>{age}</p>
        <p>{hobby}</p>
      </div>
    </>
  );
};

export default Card;
