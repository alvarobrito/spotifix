import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Card.css';

const Card = ({ title, subtitle, image, className }) => (
  <div className={classnames('card', { [`card--${className}`]: !!className })} style={{ backgroundImage: `url(${image})` }}>
    <div className="card__text">
      <strong className="card__title">{title}</strong>
      <span className="card__subtitle">{subtitle}</span>
    </div>
  </div>
);

Card.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

Card.defaultProps = {
  className: '',
  title: '',
  subtitle: '',
  image: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB3aWR0aD0iMTA2cHgiIGhlaWdodD0iMTAycHgiIHZpZXdCb3g9IjAgMCAxMDYgMTAyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4gICAgICAgIDx0aXRsZT5vcGVuMTgyPC90aXRsZT4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+ICAgIDxkZWZzPiAgICAgICAgPGZpbHRlciB4PSItNTAlIiB5PSItNTAlIiB3aWR0aD0iMjAwJSIgaGVpZ2h0PSIyMDAlIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJmaWx0ZXItMSI+ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PSIwIiBkeT0iMSIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSI+PC9mZU9mZnNldD4gICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxLjUiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSI+PC9mZUdhdXNzaWFuQmx1cj4gICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC4xNCAwIiBpbj0ic2hhZG93Qmx1ck91dGVyMSIgdHlwZT0ibWF0cml4IiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMSI+PC9mZUNvbG9yTWF0cml4PiAgICAgICAgICAgIDxmZU1lcmdlPiAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMSI+PC9mZU1lcmdlTm9kZT4gICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSJTb3VyY2VHcmFwaGljIj48L2ZlTWVyZ2VOb2RlPiAgICAgICAgICAgIDwvZmVNZXJnZT4gICAgICAgIDwvZmlsdGVyPiAgICA8L2RlZnM+ICAgIDxnIGlkPSJpbWFnZXMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHNrZXRjaDp0eXBlPSJNU1BhZ2UiPiAgICAgICAgPGcgaWQ9ImJvb2siIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00My4wMDAwMDAsIC0xMDIuMDAwMDAwKSI+ICAgICAgICAgICAgPGcgaWQ9Im9wZW4xODIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQ2LjAwMDAwMCwgMTA0LjAwMDAwMCkiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPiAgICAgICAgICAgICAgICA8ZWxsaXBzZSBpZD0iT3ZhbC0xIiBmaWxsPSIjRkZGRkZGIiBmaWx0ZXI9InVybCgjZmlsdGVyLTEpIiBjeD0iNTAuMDAwNzQwOSIgY3k9IjQ4LjIxNTAwMDIiIHJ4PSI1MC4wMDA3NDA5IiByeT0iNDguMjE1MDAwMiI+PC9lbGxpcHNlPiAgICAgICAgICAgICAgICA8ZyBpZD0iQ2FwYV8xIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNS4wMDAwMDAsIDI5LjAwMDAwMCkiIGZpbGw9IiNBNkE3QjQiPiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTQ4LjM0MDQ0NjQsMi4zNDgxMTcgQzQ3LjYzOTM4MTksMi4zNDgxMTcgNDYuOTgxMzIxNCwyLjM1NTA2MTYyIDQ2LjMyMjI2MDgsMi4zNzE5MjcxNCBMNDYuMzIyMjYwOCwwLjE1MTYzMDc5MSBMNDUuNTg4MTkzMywwLjE1MTYzMDc5MSBDMzEuMzI0ODgxMywwLjE1MTYzMDc5MSAyNi41NDM0NDE1LDMuNTM1NjQ4MTYgMjUuMDAxMjk5Niw1LjM2MjA4NDk3IEMyMy40NTkxNTc4LDMuNTM1NjQ4MTYgMTguNjc3NzE4LDAuMTUxNjMwNzkxIDQuNDE0NDA2MDQsMC4xNTE2MzA3OTEgTDMuNjgwMzM4NTIsMC4xNTE2MzA3OTEgTDMuNjgwMzM4NTIsMi4zNzA5MzUwNiBDMy4wMjIyNzc5OSwyLjM1MzA3NzQ0IDIuMzY0MjE3NDYsMi4zNDgxMTcgMS42NjQxNTMwNywyLjM0ODExNyBMMCwyLjM0ODExNyBMMCwzNC40NDIyMTMxIEwxLjY2NDE1MzA3LDM0LjQ0MjIxMzEgQzE5LjI2MDc3MTYsMzQuNDQyMjEzMSAyMi44NTIxMDIsMzguNDQ1Mjk0MyAyMy4zNjQxNDkxLDM5LjE4ODM2OTQgTDI2LjY2NjQ1MjgsMzkuMTg4MzY5NCBDMjcuMjIzNTA0MSwzOC40MTA1NzEyIDMwLjg4NDg0MDgsMzQuNDQyMjEzMSA0OC4zNDE0NDY1LDM0LjQ0MjIxMzEgTDUwLjAwNDU5OTUsMzQuNDQyMjEzMSBMNTAuMDA0NTk5NSwyLjM0ODExNyBMNDguMzQwNDQ2NCwyLjM0ODExNyBMNDguMzQwNDQ2NCwyLjM0ODExNyBaIE0yMy45MDExOTg1LDMyLjk5NDc1NDUgQzIxLjQ0Mzk3MjQsMzEuMTk3MDg4MiAxNi4yODk0OTgzLDI5LjExMTcxNjEgNS41MTY1MDc0MiwyOC45NzI4MjM1IEw1LjUxNjUwNzQyLDEuOTg2MDA0MzIgQzIwLjYwNDg5NTMsMi4xNzg0Njk2OSAyMy41MTkxNjMzLDYuMjc4Nzc1NjkgMjMuOTAxMTk4NSw2Ljk0NjQ1MTk0IEwyMy45MDExOTg1LDMyLjk5NDc1NDUgTDIzLjkwMTE5ODUsMzIuOTk0NzU0NSBaIE00NC40ODgwOTIxLDI4Ljk3MjgyMzUgQzMzLjcxNTEwMTIsMjkuMTExNzE2MSAyOC41NjA2MjcsMzEuMTk1MTA0MSAyNi4xMDM0MDEsMzIuOTk0NzU0NSBMMjYuMTAzNDAxLDYuOTU1MzgwNzQgQzI2LjUxOTQzOTMsNi4yMjQyMTA3NiAyOS41MTU3MTQ5LDIuMTc5NDYxNzggNDQuNDg4MDkyMSwxLjk4Nzk4ODUgTDQ0LjQ4ODA5MjEsMjguOTcyODIzNSBMNDQuNDg4MDkyMSwyOC45NzI4MjM1IFoiIGlkPSJTaGFwZSI+PC9wYXRoPiAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgPC9nPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+',
};

export default Card;
