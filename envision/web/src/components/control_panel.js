// Copyright (C) 2020. Huawei Technologies Co., Ltd. All rights reserved.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
import React, { useState } from "react";
import { Tree } from "antd";

export const egoAttrs = Object.freeze({
  score: 0,
  speed: 1,
  position: 2,
  heading: 3,
  laneID: 4,
});

export const socialAttrs = Object.freeze({
  score: 5,
  speed: 6,
  position: 7,
  heading: 8,
  laneid: 9,
});

export const agentModes = Object.freeze({
  egoObs: 10,
  socialObs: 11,
});

const treeData = [
  {
    title: "Vehicle Observation",
    key: "Vehicle Observation",
    children: [
      {
        title: "Ego Agent Observation",
        key: "Ego Agent Observation",
        children: [
          {
            title: "score",
            key: egoAttrs.score,
          },
          {
            title: "speed",
            key: egoAttrs.speed,
          },
          {
            title: "position",
            key: egoAttrs.position,
          },
          {
            title: "heading",
            key: egoAttrs.heading,
          },
          {
            title: "lane id",
            key: egoAttrs.laneID,
          },
        ],
      },
      {
        title: "Social Agent Observation",
        key: "Social Agent Observation",
        children: [
          {
            title: "score",
            key: socialAttrs.score,
          },
          {
            title: "speed",
            key: socialAttrs.speed,
          },
          {
            title: "position",
            key: socialAttrs.position,
          },
          {
            title: "heading",
            key: socialAttrs.heading,
          },
          {
            title: "lane id",
            key: socialAttrs.laneid,
          },
        ],
      },
    ],
  },
];

export default function ControlPanel({ showControls, toggleControlModes }) {
  const [expandedKeys, setExpandedKeys] = useState([
    "Ego Agent Observation",
    "Social Agent Observation",
  ]);
  const [checkedKeys, setCheckedKeys] = useState([
    egoAttrs.score,
    socialAttrs.score,
  ]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (expandedKeys) => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const updateToggle = (attr, on_off) => {
    if (Object.values(egoAttrs).indexOf(attr) >= 0) {
      toggleControlModes(agentModes.egoObs, attr, on_off);
    } else {
      toggleControlModes(agentModes.socialObs, attr, on_off);
    }
  };

  const onCheck = (checkedKeys, info) => {
    setCheckedKeys(checkedKeys);
    updateToggle(info.node.key, info.checked);
  };

  const onSelect = (selectedKeys, info) => {
    if (checkedKeys.includes(info.node.key)) {
      // remove from list
      setCheckedKeys((prevKeys) =>
        prevKeys.filter((key) => key != info.node.key)
      );
      updateToggle(info.node.key, false);
    } else {
      // add to list
      setCheckedKeys((prevKeys) => [...prevKeys, info.node.key]);
      updateToggle(info.node.key, true);
    }
  };

  return (
    <div
      style={{
        zIndex: "1",
        position: "relative",
        display: "flex",
        top: "0",
        left: "0",
        maxWidth: "50%",
        paddingRight: "3px",
      }}
    >
      {showControls ? (
        <Tree
          checkable
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          treeData={treeData}
        />
      ) : null}
    </div>
  );
}
