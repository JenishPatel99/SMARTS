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
import React, { useState } from 'react';
import { Tree } from 'antd';
import AgentScores from "./agent_scores.js"

const treeData = [
    {
        title: 'Vehicle Observation',
        key: 'Vehicle Observation',
        children: [
            {
                title: 'Ego Agent Observation',
                key: 'Ego Agent Observation',
                children: [
                    {
                        title: 'score',
                        key: 'egoScore',
                    },
                    {
                        title: 'speed',
                        key: 'egoSpeed',
                    },
                    {
                        title: 'position',
                        key: 'egoPosition',
                    },
                    {
                        title: 'heading',
                        key: 'egoHeading',
                    },
                    {
                        title: 'lane id',
                        key: 'egoLaneID',
                    },
                ],
            },
            {
                title: 'Social Agent Observation',
                key: 'Social Agent Observation',
                children: [
                    {
                        title: 'score',
                        key: 'socialScore',
                    },
                    {
                        title: 'speed',
                        key: 'socialSpeed',
                    },
                    {
                        title: 'position',
                        key: 'socialPosition',
                    },
                    {
                        title: 'heading',
                        key: 'socialHeading',
                    },
                    {
                        title: 'lane id',
                        key: 'socialLaneid',
                    },
                ],
            },
        ],
    }
];

export default function ControlPanel({ scores, showPanel }) {
    const [expandedKeys, setExpandedKeys] = useState(['Ego Agent Observation', '0-0-1']);
    const [checkedKeys, setCheckedKeys] = useState(['egoScore']);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.

        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeys) => {
        console.log('onCheck', checkedKeys);
        setCheckedKeys(checkedKeys);
    };

    const onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeys);
    };

    return (<div style={{
        zIndex: "1",
        position: "relative",
        display: "flex",
        "flex-direction": "row",
        top: "0",
        left: "0",
        maxWidth: "50%",
    }}>
        {showPanel ?
            <Tree
                checkable
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                treeData={treeData}
            />
            : null}
        <AgentScores
            style={{
                zIndex: "1",
                position: "relative",
                display: "inline-block",
                top: "0",
                left: "0",
                maxWidth: "100%",
            }}
            scores={scores}
        />
    </div>)
}