import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import Comment from './components/Comment.jsx';
// import CommentForm from "./components/CommentForm.jsx";
// import CommentsList from "./components/CommentsList.jsx";
// import data from '../dummyData.js';

import '../public/style.css';
import CommentsList from './components/CommentsList.jsx';
import AddComment from './components/AddComment.jsx';

class CommentsModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      user: null
    };
    this.handler = this.handler.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    var that = this;
    console.log(window.location.href);
    var path = window.location.href.split('=');
    var id = parseInt(path[1]);
    var id = path[1];

    $.ajax({
      type: 'GET',
      url: '/comments/' + id,
      success: function(res) {
        that.updateStatus(res.comments, res.logedInUser);
      }
    });
  }

  updateStatus(data, user) {
    this.setState({ comments: data, user: user });
  }

  handler(newComment) {
    this.setState({
      comments: [...this.state.comments, newComment]
    });
  }

  render() {
    return (
      <div className='mainDiv'>
        <div className='mainSection'>
          <div className='commentsHeader'>
            <h1 className='commentsCount'>
              THERE ARE {this.state.comments.length} COMMENTS
            </h1>
          </div>

          <div className='commentslist'>
            <CommentsList comments={this.state.comments} />
          </div>
          {this.state.user === null ? null : (
            <AddComment action={this.handler} user={this.state.user} />
          )}
        </div>
      </div>
    );
  }
}
ReactDOM.render(<CommentsModule />, document.getElementById('comments'));
