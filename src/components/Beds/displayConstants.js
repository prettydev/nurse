export const ALarge = 176;
export const AMedium = 136;
export const ASmall = 120;

export const BedSize = {
    Large: 'Large',
    Medium: 'Medium',
    Small: 'Small',
}
if (Object.freeze) { Object.freeze(BedSize) };

export const DisplayConfig = {
    [BedSize.Large]: {
        height: 400,
        width: ALarge,
        padding: 12,
        cellHeight: (ALarge - 10) / 6 - 1, // 10px for border        
        borderSpacing: '2px',
        bedIdFontSize: '27px',
        bedIdTop: '-7px',
        eventNameFontSize: '22px',
        eveneNameTop: '30px',
        tableWidth: (2 / 3) * ALarge,
        tableHeight: ALarge,
        bodyTop: '28px',
        bodyLeft: '-14px',
        tableTop: '116px',
        tableLeft: '17px',
        timerFontSize: '30px',
        timerTop: '190px',
        timerWidth: '152px',
        warningMarginTop: '120px',
        exclamationTop: '349px',
        exclamationRight: '-3px',
        exclamationFont: '24px',
    },
    [BedSize.Medium]: {
        height: 296,
        width: AMedium,
        padding: 8,
        cellHeight: (AMedium - 10) / 6, // 5px for border        
        borderSpacing: '1px',
        bedIdFontSize: '20px',
        bedIdTop: '-8px',
        eventNameFontSize: '17px',
        eveneNameTop: '18px',
        tableWidth: (2 / 3) * AMedium,
        tableHeight: AMedium,
        bodyTop: '7px',
        bodyLeft: '-12px',
        tableTop: '75px',
        tableLeft: '11px',
        timerFontSize: '22px',
        timerTop: '135px',
        timerWidth: '113px',
        warningMarginTop: '92px',
        exclamationTop: '248px',
        exclamationRight: '-4px',
        exclamationFont: '22px',
    },
    [BedSize.Small]: {
        height: 228,
        width: ASmall,
        padding: 8,
        cellHeight: (ASmall - 5) / 6 - 3, // 5px for border, 4 fudge
        borderSpacing: '1px',
        bedIdFontSize: '17px',
        bedIdTop: '-10px',
        eventNameFontSize: '14px',
        eveneNameTop: '13px',
        tableWidth: (2 / 3) * ASmall - 5,
        bodyTop: '-12px',
        bodyLeft: '-7px',
        tableTop: '42px',
        tableLeft: '11px',
        timerFontSize: '18px',
        timerTop: '88px',
        timerWidth: '98px',
        warningMarginTop: '60px',
        exclamationTop: '182px',
        exclamationRight: '-4px',
        exclamationFont: '20px',
    },
}
