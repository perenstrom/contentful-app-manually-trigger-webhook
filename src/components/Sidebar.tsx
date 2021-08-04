import { Button } from "@contentful/forma-36-react-components";
import { SidebarExtensionSDK } from "@contentful/app-sdk";
import { useState } from "react";

interface SidebarProps {
  sdk: SidebarExtensionSDK;
}

interface InstanceParameters {
  buttonText: string;
  webhookUrl: string;
}

const Sidebar = (props: SidebarProps) => {
  const instanceParameters = props.sdk.parameters
    .instance as InstanceParameters;
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    const url = instanceParameters.webhookUrl;
    const options: RequestInit = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    fetch(url, options)
      .then((response) => {
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <Button
      loading={loading}
      disabled={loading}
      isFullWidth={true}
      icon={"Cycle"}
      onClick={handleClick}
    >
      {instanceParameters.buttonText}
    </Button>
  );
};

export default Sidebar;
