import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchHeaders from "../../utils/Headers";
import { SERVER_DOMAIN } from "../../utils/Variables";

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${SERVER_DOMAIN}/api/auth/verificate/${token}`, {
      method: "GET",
      headers: fetchHeaders,
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/login", {
          replace: true,
          state: { message: data.message, type: data.type },
        });
      })
      .catch((err) => {
        navigate("/", { replace: true });
      });
  }, []);

  return (
    <span
      style={{
        color: "black",
      }}
    >
      Loading...
    </span>
  );
};

export default EmailVerification;
