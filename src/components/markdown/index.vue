<template>
  <Row :gutter="20">
    <Col :sm='24' :md='this.preSee ? 13 : 24'>
      <div>
        <Input
          placeholder="编写文章,markdown语法"
          type='textarea'
          :value="value"
          @on-change="handleChange"
          :autosize="{ minRows: 20}"
        />
      </div>
    </Col>
    <Col :sm='24' :md='this.preSee ? 11 : 0'>
      <div v-html="contentHtml" class="markdown-preview"></div>
    </Col>
  </Row>
</template>
<script>
import marked from 'marked'
import 'highlight.js/styles/github.css'
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    preSee: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      contentHtml: ''
    }
  },
  mounted() {
		this.marked = marked
		this.marked.setOptions({
			highlight: function (code) {
				return require('highlight.js').highlightAuto(code).value
			}
		})
		setTimeout(_ => {
			this.contentHtml = this.marked(this.value)
		}, 1000)
  },
  methods: {
    handleChange(e) {
      this.contentHtml = this.marked(e.target.value)
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss">
.markdown-preview {
	color: #111;
	font-size: 15px;
	font-family: Consolas,"Microsoft YaHei",Menlo,Courier,monospace;
	p, ol, ul, table, pre {
		margin-bottom: 8px;
	}
	p + ul {
		margin-top: -7px;
	}
	code {
		margin: 0;
		padding: 0.168em 0.4em;
		border-radius: 3px;
		background-color: rgba(27,31,35,0.1);
	}
	pre {
		font-size: 14px;
		color: #eee;
		padding: 6px 12px;
		overflow: auto;
		border-radius: 2px;
		background-color: #111;
		> code {
			padding: 0;
			background-color: inherit;
		}
	}
	blockquote {
		p {
			margin-bottom: 0;
		}
		color: #505050;
		padding: 13px 10px;
		margin-top: 3px;
		margin-bottom: 13px;
		background-color: #f1f1f1;
		border-left: 0.25em solid #ccc;
	}
	h1, h2 {
		padding-bottom: 5px;
		border-bottom: 1px solid #eaecef;
	}
	h1, h2, h3 {
		margin-top: 20px;
		margin-bottom: 10px;
		color: #24292e;
		line-height: initial;
	}
	h4, h5, h6 {
		margin-top: 10px;
		margin-bottom: 6px;
	}
	h1, h2, h3, h4, h5, h6 {
		font-weight: 600;
	}
	h1 {
		font-size: 26px;
	}
	h2 {
		font-size: 22px;
	}
	h3 {
		font-size: 19px;
	}
	h4 {
		font-size: 17px;
	}
	h5 {
		font-size: 15px;
	}
	h6 {
		font-size: 13px;
	}
	ol {
		list-style: decimal;
	}
	ul {
		list-style: circle;
	}
	ol, ul {
		padding-left: 20px;
		ul {
			list-style: disc;
			ul, ol {
				list-style: square;
			}
		}
		ol {
			list-style: lower-alpha;
			ul, ol {
				list-style: square;
			}
		}
	}
}

.hljs {
	display: block;
	overflow-x: auto;
	padding: 0.5em;
	background: #23241f;
}

.hljs,
.hljs-tag,
.hljs-subst {
	color: #f8f8f2;
}

.hljs-strong,
.hljs-emphasis {
	color: #a8a8a2;
}

.hljs-bullet,
.hljs-quote,
.hljs-number,
.hljs-regexp,
.hljs-literal,
.hljs-link {
	color: #ae81ff;
}

.hljs-code,
.hljs-title,
.hljs-section,
.hljs-selector-class {
	color: #a6e22e;
}

.hljs-strong {
	font-weight: bold;
}

.hljs-emphasis {
	font-style: italic;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-name,
.hljs-attr {
	color: #f92672;
}

.hljs-symbol,
.hljs-attribute {
	color: #66d9ef;
}

.hljs-params,
.hljs-class .hljs-title {
	color: #f8f8f2;
}

.hljs-string,
.hljs-type,
.hljs-built_in,
.hljs-builtin-name,
.hljs-selector-id,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-addition,
.hljs-variable,
.hljs-template-variable {
	color: #e6db74;
}

.hljs-comment,
.hljs-deletion,
.hljs-meta {
	color: #828073;
}
</style>
