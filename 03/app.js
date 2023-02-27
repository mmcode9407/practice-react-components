import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.querySelector('#root'));

class Article extends React.Component {
	state = {
		comments: [],
		commentContent: '',
	};

	changeHandler = (e) => {
		const { value } = e.target;
		this.setState({ commentContent: value });
	};

	submitHandler = (e) => {
		e.preventDefault();
		const { commentContent } = this.state;
		if (commentContent) {
			this.addComment(commentContent);
			this.setState({
				commentContent: '',
			});
		} else {
			alert('Nie można dodać pustego komentarza!');
		}
	};

	render() {
		const { title, body } = this.props;
		const { commentContent } = this.state;
		return (
			<article>
				<h1>{title}</h1>
				<p>{body}</p>
				<section>
					<form onSubmit={this.submitHandler}>
						<div>
							<label>
								<textarea
									onChange={this.changeHandler}
									style={{ minWidth: '300px', minHeight: '120px' }}
									name='content'
									value={commentContent}
								/>
							</label>
						</div>
						<div>
							<input type='submit' value='dodaj komentarz' />
						</div>
					</form>
					<ul>{this.renderComments()}</ul>
				</section>
			</article>
		);
	}

	renderComments() {
		const { comments } = this.state;
		return comments.map((comment) => <li>{comment}</li>);
	}

	addComment(comment) {
		this.setState({
			comments: [...this.state.comments, comment],
		});
	}
}

root.render(
	<Article
		title='Programowanie jest super!'
		body='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis justo ipsum, eleifend vel quam eget, lobortis posuere arcu. In vitae eros in nisi sodales aliquam...'
	/>
);
