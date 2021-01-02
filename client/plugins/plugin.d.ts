// 1. Make sure to import 'vue' before declaring augmented types
import Vue from 'vue'

declare module 'vue/types/vue' {
	// 3. Declare augmentation for Vue
	interface Vue {
		$notification: (message: string, color: string) => void
	}
}
