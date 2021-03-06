import React from 'react'
import PropTypes from 'prop-types'
import Login from './Login'

import pic01 from '../images/pic01.jpg'
import pic02 from '../images/pic02.jpg'
import pic03 from '../images/pic03.jpg'

class Main extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        data: null,
        cobSession: null,
        isLoading: false,
        user: null
      };
    }
    getSessionId() {
      fetch('https://developer.api.yodlee.com/ysl/cobrand/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Api-Version": "1.1",
            "Cobrand-Name": "restserver",
          },
          body: JSON.stringify({
            cobrand: {
              cobrandLogin: 'sbCobd5df3ae017d08381a7984d273428f044ca',
              cobrandPassword: 'a54f6848-8426-4a85-91cf-b61bd5982f9a',
              locale: 'en_US'
            }
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Data', data.session.cobSession);

          this.setState({
            cobSession : data.session.cobSession
          });

        });
    }

    userLogin() {
      fetch('https://developer.api.yodlee.com/ysl/user/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Api-Version": "1.1",
            "Cobrand-Name": "restserver",
            "Authorization": `cobSession=${this.state.cobSession}`
          },
          body: JSON.stringify({
            user: {
              loginName: 'sbMemd5df3ae017d08381a7984d273428f044ca2',
              password: 'sbMemd5df3ae017d08381a7984d273428f044ca2#123',
              locale: 'en_US'
            }
          })
        })
        .then(response => response.json())
          .then(data => {
            this.setState({
              user: data.user
            });
          });
    }


  render() {

    let close = <div className="close" onClick={() => {this.props.onCloseArticle()}}></div>

    return (
      <div ref={this.props.setWrapperRef} id="main" style={this.props.timeout ? {display: 'flex'} : {display: 'none'}}>

        <article id="intro" className={`${this.props.article === 'intro' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <h2 className="major">Intro</h2>
          <span className="image main"><img src={pic01} alt="" /></span>
          <p>Aenean ornare velit lacus, ac varius enim ullamcorper eu. Proin aliquam facilisis ante interdum congue. Integer mollis, nisl amet convallis, porttitor magna ullamcorper, amet egestas mauris. Ut magna finibus nisi nec lacinia. Nam maximus erat id euismod egestas. By the way, check out my <a href="#work">awesome work</a>.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dapibus rutrum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam tristique libero eu nibh porttitor fermentum. Nullam venenatis erat id vehicula viverra. Nunc ultrices eros ut ultricies condimentum. Mauris risus lacus, blandit sit amet venenatis non, bibendum vitae dolor. Nunc lorem mauris, fringilla in aliquam at, euismod in lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In non lorem sit amet elit placerat maximus. Pellentesque aliquam maximus risus, vel sed vehicula.</p>
          {close}
        </article>

        <article id="work" className={`${this.props.article === 'work' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <h2 className="major">Log In</h2>
          <span className="image main"><img src={pic02} alt="" /></span>
          <Login></Login>
          {close}
        </article>

        <article id="about" className={`${this.props.article === 'about' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <h2 className="major">About</h2>
          <button onClick={this.getSessionId}>getSessionId</button>
          <button onClick={this.userLogin}>userLogin</button>
          {close}
        </article>

        <article id="contact" className={`${this.props.article === 'contact' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <h2 className="major">Contact</h2>
          <form method="post" action="#">
            <div className="field half first">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" />
            </div>
            <div className="field half">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows="4"></textarea>
            </div>
            <ul className="actions">
              <li><input type="submit" value="Send Message" className="special" /></li>
              <li><input type="reset" value="Reset" /></li>
            </ul>
          </form>
          <ul className="icons">
            <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
            <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
            <li><a href="#" className="icon fa-github"><span className="label">GitHub</span></a></li>
          </ul>
          {close}
        </article>

      </div>
    )
  }
}

Main.propTypes = {
  route: PropTypes.object,
  article: PropTypes.string,
  articleTimeout: PropTypes.bool,
  onCloseArticle: PropTypes.func,
  timeout: PropTypes.bool,
  setWrapperRef: PropTypes.func.isRequired,
}

export default Main