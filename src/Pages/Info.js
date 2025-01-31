import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "antd";

const { Meta } = Card;

const InfoPage = () => {
  const LOCAL_IP = "https://time-backend.onrender.com";
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`${LOCAL_IP}/api/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching worker data:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(users);

  return (
    <div>
      <Header />
      <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
        <h1 style={{ textAlign: "center", color: "#61abff" }}>
          Ажилчдын мэдээлэл
          <div>
            {users.map((user) => (
              <Card
                key={user.user_id}
                hoverable
                style={{ width: 240, margin: "20px", display: "inline-block" }}
                cover={
                  <img
                    alt="example"
                    src={`/Images/profile-${user.user_id}.jpg`}
                    width={240}
                    onError={(e) =>
                      (e.target.src = "/Images/default-profile.png")
                    }
                  />
                }
              >
                <Meta
                  title={user.user_name}
                  description={
                    <>
                      Майл хаяг:
                      <br />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        {user.user_email}
                      </span>
                      <br />
                      Албан тушаал:
                      <br />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        {user.user_role}
                      </span>
                      <br />
                      Утас:
                      <br />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        {user.user_phone}
                      </span>
                      <br />
                      Боловсролын зэрэг:
                      <br />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        {user.user_education}
                      </span>
                    </>
                  }
                />
              </Card>
            ))}
          </div>
        </h1>
      </div>
      <Footer />
    </div>
  );
};

export default InfoPage;
