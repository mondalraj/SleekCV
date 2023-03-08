import IProfileDetails from "@/types/profileDetailsType";
import { Box, Text, TextInput } from "@mantine/core";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface IProps {
  profile: IProfileDetails;
  setProfile: (profile: IProfileDetails) => void;
}

const ProfileSection = ({ profile, setProfile }: IProps) => {
  return (
    <>
      <Text
        sx={{
          fontSize: "1.1rem",
          borderBottom: "1px solid #eaeaea",
        }}
      >
        Profile Details
      </Text>
      <TextInput
        placeholder="Your name"
        label="Full name"
        variant="filled"
        required
        onChange={(e) => {
          setProfile({ ...profile, name: e.target.value });
        }}
        value={profile.name}
      />
      <Box
        sx={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          sx={{
            width: "50%",
          }}
          placeholder="Your Email"
          label="Email"
          variant="filled"
          type="email"
          required
          onChange={(e) => {
            setProfile({ ...profile, email: e.target.value });
          }}
          value={profile.email}
        />
        <TextInput
          sx={{
            width: "50%",
          }}
          placeholder="Your Linkedin profile"
          label="Linkedin profile URL"
          type="url"
          variant="filled"
          required
          onChange={(e) => {
            setProfile({ ...profile, linkedin: e.target.value });
          }}
          value={profile.linkedin}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Box
          sx={{
            width: "50%",
          }}
          className="light-phone-input phone-input-container"
        >
          <Text
            component="label"
            htmlFor="phoneInput"
            size="sm"
            weight={500}
            sx={{ display: "block", marginBottom: "0.2rem" }}
            // mt={3}
          >
            Phone Number
            <Text span color="red">
              {" "}
              *
            </Text>
          </Text>
          <PhoneInput
            id="phoneInput"
            className="phone-input"
            defaultCountry="IN"
            limitMaxLength={true}
            international
            value={profile.phone}
            onChange={(value) => {
              setProfile({ ...profile, phone: value as string });
            }}
          />
        </Box>

        <TextInput
          sx={{
            width: "50%",
          }}
          placeholder="Your Github Profile / Portfolio"
          label="Github Profile / Portfolio"
          type="url"
          variant="filled"
          required
          onChange={(e) => {
            setProfile({ ...profile, github: e.target.value });
          }}
          value={profile.github}
        />
      </Box>
    </>
  );
};

export default ProfileSection;
