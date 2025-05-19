import Button from "@mui/material/Button";

interface TextInputProps {
  name: string;
  onClick: () => void;
  disable?: boolean;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  variant?: "text" | "outlined" | "contained";
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  onClick,
  disable = false,
  color = "primary",
  variant = "contained",
}) => {
  return (
    <div>
      <Button
        id={name}
        name={name}
        onClick={onClick}
        variant={variant}
        color={color}
        disabled={disable}
      >
        {name}
      </Button>
    </div>
  );
};

export default TextInput;
