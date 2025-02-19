import { Component, Injector, OnInit } from '@angular/core';
import { I18nService } from 'core-app/core/i18n/i18n.service';
import { QueryColumn } from 'core-app/features/work-packages/components/wp-query/query-column';
import { ConfigurationService } from 'core-app/core/config/configuration.service';
import { WorkPackageViewColumnsService } from 'core-app/features/work-packages/routing/wp-view-base/view-services/wp-view-columns.service';
import { TabComponent } from 'core-app/features/work-packages/components/wp-table/configuration-modal/tab-portal-outlet';
import { BannersService } from 'core-app/core/enterprise/banners.service';
import { DraggableOption } from 'core-app/shared/components/autocompleter/draggable-autocomplete/draggable-autocomplete.component';
import { enterpriseDocsUrl } from 'core-app/core/setup/globals/constants.const';

@Component({
  templateUrl: './columns-tab.component.html',
})
export class WpTableConfigurationColumnsTabComponent implements TabComponent, OnInit {
  public availableColumnsOptions = this.wpTableColumns.all.map((c) => this.column2Like(c));

  public availableColumns = this.wpTableColumns.all;

  public availableColumnsMap:{ [id:string]:QueryColumn } = _.keyBy(this.availableColumns, (c) => c.id);

  public selectedColumns:DraggableOption[] = this.wpTableColumns.getColumns().map((c) => this.column2Like(c));

  public selectedColumnMap:{ [id:string]:boolean } = {};

  public eeShowBanners = false;

  public text = {
    columnsHelp: this.I18n.t('js.work_packages.table_configuration.columns_help_text'),
    columnsLabel: this.I18n.t('js.label_columns'),
    multiSelectLabel: this.I18n.t('js.work_packages.label_column_multiselect'),

    upsaleRelationColumns: this.I18n.t('js.work_packages.table_configuration.upsale.relation_columns'),
    upsaleCheckOutLink: this.I18n.t('js.work_packages.table_configuration.upsale.check_out_link'),
    moreInfoLink: enterpriseDocsUrl.website,

    inputPlaceholder: this.I18n.t('js.label_search_columns'),
    inputLabel: this.I18n.t('js.label_add_columns'),
    inputDragLabel: this.I18n.t('js.label_manage_columns'),
  };

  constructor(
    readonly injector:Injector,
    readonly I18n:I18nService,
    readonly wpTableColumns:WorkPackageViewColumnsService,
    readonly bannerService:BannersService,
) {
  }

  public onSave() {
    this.wpTableColumns.setColumnsById(this.selectedColumns.map((c) => c.id));
  }

  ngOnInit() {
    this.eeShowBanners = this.bannerService.eeShowBanners;
    this.selectedColumns.forEach((c:DraggableOption) => {
      this.selectedColumnMap[c.id] = true;
    });
  }

  private column2Like(c:QueryColumn):DraggableOption {
    return { id: c.id, name: c.name };
  }

  updateSelected(selected:DraggableOption[]) {
    this.selectedColumns = selected;
  }
}
