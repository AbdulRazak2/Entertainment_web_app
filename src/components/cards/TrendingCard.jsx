import React from 'react';
import styled from 'styled-components';
import MoviesIcon from '../../assets/custom-svgs/MoviesIcon';
import TvShowsIcon from '../../assets/custom-svgs/TvShowsIcon';
import { useBookmarks } from '../../hooks/useBookmark/useBookmarks';
import {
	BookmarkBtn,
	BookmarkIcon,
	Category,
	CategoryIcon,
	Dot,
	Info,
} from './SharedStyles';

//Trending card details and its styled

function TrendingCard({ movie }) {
	const {
		id,
		title,
		year,
		category,
		rating,
		thumbnail: {
			trending: { large: image },
		},
	} = movie;

	const { handleToggleBookmark, data: bookmarks } = useBookmarks();

	const Icon = category === 'Movie' ? MoviesIcon : TvShowsIcon;

	return bookmarks ? (
		<Container bg={image}>
			<BookmarkBtn onClick={() => handleToggleBookmark(id)}>
				<BookmarkIcon
					src='./assets/icon-bookmark-full.svg'
					alt=''
					visible={bookmarks[id]}
				/>
				<BookmarkIcon
					src='./assets/icon-bookmark-empty.svg'
					alt=''
					visible={!bookmarks[id]}
				/>
			</BookmarkBtn>
			<Info>
				{year}
				<Dot />
				<Category>
					<CategoryIcon as={Icon} />
					{category}
				</Category>
				<Dot />
				{rating}
			</Info>
			<Title>{title}</Title>
		</Container>
	) : null;
}

export default TrendingCard;

const Container = styled.div`
	background: url(${(p) => p.bg});
	background-size: cover;
	background-position: top left;
	width: 47rem;
	min-width: 47rem;
	min-height: 23rem;
	border-radius: var(--radius-400);
	position: relative;
	display: grid;
	align-content: flex-end;
	padding: 2rem;
	overflow: hidden;

	* {
		z-index: 2;
	}

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 60%;
		background: linear-gradient(
			180deg,
			hsla(0, 0%, 0%, 0.01) 10%,
			hsla(0, 0%, 0%, 1) 99%
		);
		z-index: 1;
	}
`;

const Title = styled.h2`
	font-weight: 500;
`;
