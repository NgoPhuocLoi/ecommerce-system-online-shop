"use client";
import { Editor, Element, Frame } from "@craftjs/core";
// import * as theme2 from "@/components/editable/theme-2";
// import * as editableComponentsV2 from "@/components/editable/v2";
import { PlaceholderContainer, Text } from "@/components/editable/v2";
const OnlineShopView = () => {
  return (
    <Editor resolver={{ PlaceholderContainer, Text }} enabled={false}>
      <Frame>
        <Element is={PlaceholderContainer} canvas>
          <Text content="Hello World" />
        </Element>
      </Frame>
    </Editor>
  );
};

export default OnlineShopView;
