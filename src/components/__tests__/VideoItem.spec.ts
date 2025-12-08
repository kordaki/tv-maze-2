import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import VideoItem from '@/components/VideoListItem.vue'
import { VideoMockBuilder } from '@/mock/VideoMockBuilder'

const videoMockBuilder = new VideoMockBuilder()

describe('VideoItem UI', () => {
  it('renders properly', () => {
    const sampleName = 'Interstellar'
    const mockVideo = { ...videoMockBuilder.create(), name: sampleName }

    const wrapper = mount(VideoItem, { props: mockVideo })
    expect(wrapper.text()).toContain(sampleName)
  })
})
