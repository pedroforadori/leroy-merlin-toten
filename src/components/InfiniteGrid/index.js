import React, { PureComponent } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { InfiniteLoader, List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import css from 'dom-css'

import 'react-virtualized/styles.css'

import Text from '../../atoms/Text'
import WrapperFlex from '../../molecules/WrapperFlex'
import LoadingDots from '../icons/LoadingDots'
import CardHelper from '../../molecules/CardHelper'

const STATUS_LOADING = 1
const STATUS_LOADED = 2

// const shadowStyle = {
//   position: 'absolute',
//   left: 0,
//   right: 0,
//   height: 10
// }

export default class InfiniteGrid extends PureComponent {
  state = {
    loadedRowCount: 0,
    loadedRowsMap: {},
    loadingRowCount: 0
  }

  timeoutIdMap = {}

  cache = new CellMeasurerCache({
    defaultHeight: 432,
    fixedWidth: true
    // keyMapper: () => 1
  })

  clearData = () => {
    this.setState({
      loadedRowCount: 0,
      loadedRowsMap: {},
      loadingRowCount: 0
    })
  }

  isRowLoaded = ({ index }) => {
    // console.log('Is row loaded')
    return !!this.props.list[index]

    // const { loadedRowsMap } = this.state
    // return !!loadedRowsMap[index] // STATUS_LOADING or STATUS_LOADED
  }

  loadMoreRows = ({ startIndex, stopIndex }) => {
    // console.log('Get list request')
    // this.props.getGridRequest({})
    // const { loadedRowsMap, loadingRowCount } = this.state
    // const increment = stopIndex - startIndex + 1
    // for (var i = startIndex; i <= stopIndex; i++) {
    //   loadedRowsMap[i] = STATUS_LOADING
    // }
    // this.setState({
    //   loadingRowCount: loadingRowCount + increment
    // })
    // const timeoutId = setTimeout(() => {
    //   const { loadedRowCount, loadingRowCount } = this.state
    //   delete this.timeoutIdMap[timeoutId]
    //   for (var i = startIndex; i <= stopIndex; i++) {
    //     loadedRowsMap[i] = STATUS_LOADED
    //   }
    //   this.setState({
    //     loadingRowCount: loadingRowCount - increment,
    //     loadedRowCount: loadedRowCount + increment
    //   })
    //   promiseResolver()
    // }, 1000 + Math.round(Math.random() * 2000))
    // this.timeoutIdMap[timeoutId] = true
    // let promiseResolver
    // return new Promise(resolve => {
    //   promiseResolver = resolve
    // })
  }

  // handleScroll = e => {
  //   this.list.Grid._onScroll(e)
  // }

  // handleUpdate = values => {
  //   const { shadowTop, shadowBottom } = this
  //   const { scrollTop, scrollHeight, clientHeight } = values

  //   const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20)

  //   const bottomScrollTop = scrollHeight - clientHeight

  //   const shadowBottomOpacity =
  //     (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20))

  //   css(shadowTop, { opacity: shadowTopOpacity })
  //   css(shadowBottom, { opacity: shadowBottomOpacity })
  // }

  // objHasChanged = (obj1, obj2) => {
  //   if (Object.getOwnPropertyNames(obj1).length !== Object.getOwnPropertyNames(obj2).length) {
  //     console.log('object has changed length')
  //     this.cache.clearAll()
  //     return true
  //   }

  //   for (let val in obj1) {
  //     console.log('obj1[val]', obj1[val], val)
  //     console.log('obj2[val]', obj2[val], val)

  //     if (obj1[val] !== obj2[val]) {
  //       console.log('object has changed', this.cache.clear(val), this.props.list.length)
  //       // this.cache.clear(val)
  //       // this.list.recomputeRowHeights(val)
  //       this.cache.clearAll()
  //       return true
  //     }
  //   }

  //   return false
  // }

  componentDidMount = () => {
    this.list.Grid._scrollingContainer = this.scroll.view
  }

  componentWillUnmount() {
    Object.keys(this.timeoutIdMap).forEach(timeoutId => {
      clearTimeout(timeoutId)
    })
  }

  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    parent,
    style, // Style object to be applied to row (to position it)
    isScrolling, // The List isly being scrolled
    isVisible // This row is visible within the List (eg it is not an overscanned row)
  }) => {
    const { list, Item, cardWidth, Header } = this.props

    const items = []
    const fromIndex = index * this.itemsPerRow
    const toIndex = Math.min(fromIndex + this.itemsPerRow, list.length)

    // if (fromIndex === 1) {

    // }

    for (let i = fromIndex + 1; i < toIndex + 1; i++) {
      items.push(<Item {...this.props} data={list[i]} index={i} />)
    }

    if (fromIndex + this.itemsPerRow + 1 > list.length + 1) {
      for (let i = list.length + 1; i < fromIndex + this.itemsPerRow + 1; i++) {
        items.push(<CardHelper cardWidth={cardWidth} />)
      }
    }

    return (
      <CellMeasurer key={key} cache={this.cache} parent={parent} columnIndex={0} rowIndex={index}>
        {({ measure }) => {
          // const getContent = () => {
          //   // this.cache.clear(index, 0)
          //   if (this.props.sortBy)
          //     return <Item {...this.props} data={list[index]} redirectTo={redirectTo} />

          //   return <Item {...this.props} data={list[index]} redirectTo={redirectTo} />
          // }
          if (index === 0) return <Header {...this.props} />

          return (
            <div
              style={{
                ...style,
                display: 'flex',
                justifyContent: 'space-around',
                padding: 10
              }}
            >
              {/* {isScrolling ? (
                // {false ? (
                // <>
                //   <Text text={`Carregando #${list[index][idAttr]}...`} />
                //   <WrapperFlex justifyCenter alignCenter>
                //     <LoadingDotsAnimation />
                //   </WrapperFlex>
                // </>
                <Item loading data={list[index]} />
              ) : (
                // item({ list, index })
                <Item {...this.props} data={list[index]} redirectTo={redirectTo} />
                // getContent()
                )} */}

              {/* <Item
                {...this.props}
                data={list[index]}
                index={index}
                redirectTo={redirectTo}
                // forceUpdate={index => {
                //   this.cache.clear(index)
                //   this.list.recomputeRowHeights()
                // }}
              /> */}

              {items}
            </div>
          )
        }}
      </CellMeasurer>
    )
  }

  render() {
    const { style, cardWidth, ...props } = this.props

    return (
      // <InfiniteLoader
      //   isRowLoaded={() => this.isRowLoaded}
      //   loadMoreRows={() => this.loadMoreRows}
      //   rowCount={Math.ceil(props.list.length / 3)}
      // >
      //   {({ registerChild, onRowsRendered }) => (
      <AutoSizer>
        {({ height, width }) => {
          this.itemsPerRow = Math.floor((width || cardWidth) / cardWidth)
          // console.log('itemsPerRow', this.itemsPerRow)

          this.rowCount = Math.ceil(props.list.length / this.itemsPerRow)
          // console.log('rowCount', this.rowCount)

          return (
            <>
              {/* <Scrollbars
                autoHide
                ref={node => (this.scroll = node)}
                onScroll={this.handleScroll}
                onUpdate={this.handleUpdate}
                style={{ height, width, marginBottom: 60 }}
                {...props}
              > */}
              <List
                {...props}
                ref={node => {
                  this.list = node
                  // return registerChild
                }}
                style={{ overflowX: 'visible', overflowY: 'visible' }}
                // onRowsRendered={onRowsRendered}
                rowRenderer={this.rowRenderer}
                overscanRowCount={3}
                deferredMeasurementCache={this.cache}
                rowCount={this.rowCount}
                rowHeight={this.cache.rowHeight}
                height={height}
                width={width}
              />
              {/* </Scrollbars> */}

              {/* <div
                ref={node => (this.shadowTop = node)}
                style={{
                  ...shadowStyle,
                  top: 0,
                  background:
                    'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)'
                }}
              />

              <div
                ref={node => (this.shadowBottom = node)}
                style={{
                  ...shadowStyle,
                  bottom: 0,
                  background:
                    'linear-gradient(to top, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)'
                }}
              /> */}
            </>
          )
        }}
      </AutoSizer>
      //   )}
      // </InfiniteLoader>
    )
  }
}
