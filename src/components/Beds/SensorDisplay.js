import PropTypes from 'prop-types';
import React from 'react';
import '../../App.scss';
import './Bed.scss';
import { BedSize, DisplayConfig } from './displayConstants';

function SensorDisplay({ currentPressure, size, zeroPressureDark }) {
    const cfg = DisplayConfig[size];
    let rawTable = null;
    if (currentPressure) {
        const is4A = currentPressure.length > 36;
        let i = 0;
        const nRows = is4A ? 12 : 6;
        const nCols = 6;
        const keybase = Math.random();

        const rows = [];
        for (let r = 0; r < nRows; r++) {
            const cells = [];
            for (let c = 0; c < nCols; c++) {
                let cellClass;
                const dataPt = currentPressure[nRows * c + r]; // data is listed by column, index by row
                if (dataPt < 5) cellClass = 'over-1';
                else if (dataPt >= 5 && dataPt < 10) cellClass = 'over-5';
                else if (dataPt >= 10 && dataPt < 30) cellClass = 'over-10';
                else if (dataPt >= 30 && dataPt < 60) cellClass = 'over-30';
                else if (dataPt >= 60 && dataPt < 90) cellClass = 'over-60';
                else if (dataPt >= 90 && dataPt < 120) cellClass = 'over-90';
                else if (dataPt >= 120 && dataPt <= 240) cellClass = 'over-120';
                else cellClass = zeroPressureDark ? 'zeroDark' : 'zeroLight';
                const cellHeight = r < 6 ? cfg.cellHeight : cfg.cellHeight / 2;
                cells.push(<td key={`${keybase}r${r}c${c}`} className={cellClass} style={{ height: cellHeight }}> </td>);
                i++;
            }
            rows.push(<tr key={`${keybase}r${r}`} style={{ height: 10 }}>{cells}</tr>)
        }
        rawTable = (
            <table style={{
                height: is4A ? 1.5 * cfg.tableHeight : cfg.tableHeight,
                width: cfg.tableWidth,
                borderCollapse: 'separate',
                borderSpacing: cfg.borderSpacing,
                margin: 'auto'
            }}>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }

    return rawTable;
}

SensorDisplay.defaultProps = {
    zeroPressureDark: true,
};

SensorDisplay.propTypes = {
    size: PropTypes.oneOf([BedSize.Large, BedSize.Medium, BedSize.Small]),
    zeroPressureDark: PropTypes.bool,
    currentPressure: PropTypes.array,
};

export default SensorDisplay;

