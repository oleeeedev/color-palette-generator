export function generateRandomColor(): string {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
}

export function generateComplementaryColor(hex: string): string {
    const rgb = hexToRgb(hex)
    const comp = [
        255 - rgb[0],
        255 - rgb[1],
        255 - rgb[2]
    ]
    return rgbToHex(comp)
}

export function generateAnalogousColors(hex: string): string[] {
    const hsl = hexToHsl(hex)
    const h = hsl[0]
    return [
        hslToHex([(h + 30) % 360, hsl[1], hsl[2]]),
        hslToHex([(h + 330) % 360, hsl[1], hsl[2]])
    ]
}

export function generateTriadicColors(hex: string): string[] {
    const hsl = hexToHsl(hex)
    const h = hsl[0]
    return [
        hslToHex([(h + 120) % 360, hsl[1], hsl[2]]),
        hslToHex([(h + 240) % 360, hsl[1], hsl[2]])
    ]
}

function hexToRgb(hex: string): number[] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : [0, 0, 0]
}

function rgbToHex(rgb: number[]): string {
    return '#' + rgb.map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('')
}

function hexToHsl(hex: string): number[] {
    const [r, g, b] = hexToRgb(hex).map(x => x / 255)
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0
    const l = (max + min) / 2

    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break
            case g: h = (b - r) / d + 2; break
            case b: h = (r - g) / d + 4; break
        }
        h /= 6
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hslToHex([h, s, l]: number[]): string {
    l /= 100
    const a = s * Math.min(l, 1 - l) / 100
    const f = (n: number) => {
        const k = (n + h / 30) % 12
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
        return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
}