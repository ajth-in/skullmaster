import SkullIcon from "./icons/skull";
import { Button } from "./ui/button";
import ShadowRoot from "./shadow-root";
import { css } from "lit";
import { useSkullMaster } from "./skullmaster-provider";
export type PostSkeletonsProps = {
  isEnabled: boolean;
  port?: number;
};
export default function PostSkeletons() {
  const { isEnabled, setIsEnabled } = useSkullMaster();
  return (
    <ShadowRoot>
      <style>
        {
          css`
            .control-panel-button {
              position: fixed;
              bottom: 16px;
              right: 16px;
              z-index: 9999;
              /* opacity: 0.5; */
              transition: all 100ms ease-in-out;
            }
          `.cssText
        }
      </style>
      <Button
        aria-label={isEnabled ? "Disable SkullMaster" : "Enable SkullMaster"}
        data-selected={isEnabled}
        onClick={() => {
          setIsEnabled(!isEnabled);
        }}
        className={"control-panel-button"}
      >
        <SkullIcon furious={isEnabled} size={27} />
      </Button>
    </ShadowRoot>
  );
}
