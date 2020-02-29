export const audioQualityMap = {
    very_low: {
        encoding: 'amr_nb',
        bitRate: 12000,
        sampleRate: 8000,
        quality: 'low'
    },
    low: {
        encoding: 'amr_wb',
        bitRate: 32000,
        sampleRate: 44100,
        quality: 'low'
    },
    medium: {
        encoding: 'aac',
        bitRate: 128000,
        sampleRate: 44100,
        quality: 'medium'
    },
    high: {
        encoding: 'aac_eld',
        bitRate: 1411000,
        sampleRate: 44100,
        quality: 'high'
    },
    very_high: {
        encoding: 'aac_eld',
        bitRate: 1411000,
        sampleRate: 48000,
        quality: 'high'
    }
};