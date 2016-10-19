<div id="imgBox" class="shadowWrapper isImgBoxEdit">
	<script src="<?php echo base_url('/resource/js/lib/typeahead.bundle.min.js')?>"></script>
	<script src="<?php echo base_url('/resource/js/autogrow.min.js')?>"></script>
	<script src="<?php echo base_url('/resource/js/popupBoxEdit.js')?>"></script>
	<span id="authorBox"><?php echo $imgObj->getAuthor()->getUsername().' '.date('Y-m-d', strtotime($imgObj->getCreated()));?></span>
	<div class="shadowLayer baseLayer"></div>
	<div class="baseLayer">
		<div class="mainBox">
		<form action="/publish" method="post">
			<input type="text" id="imgId" name="imgId" value="<?php echo $imgObj->getId();?>" hidden>
			<div class="popupImg" id="imgTitleBox"><input type="text" id="imgTitle" name="imgTitle" value="<?php echo $imgObj->getTitle();?>" autofocus></div>
			<div class="popupImg loadingBg" id="popImgBox"></div>
			<div class="popupImg" id="popImgText">
				<span class="innerBox">
					<div id="imgAuthorTags" class="itag"><a id="authorTag" href="#">North Fan</a></div>
							<span id="imgTags"><?php
								$tags = $imgObj->getTags();
								foreach ($tags as $item) {
									echo "<div class='itag'><a href='".base_url('/tags/'.$item->getId())."'>".$item->getTagName()."</a></div>";
								}
								?></span>
				</span>
				<br>
				<span class="innerBox" id="imgTagNameAutoComplete">
					<input class="imgTagName typeahead" type="text" maxlength="20" placeholder="Tagging this photo"/>
				</span>

				<span class="innerBox" id="imgStatusBox">
					<select id="imgStatus" name="imgStatus">
						<?php
						$status = $imgObj->getStatus();

						$options = array(IMG_STATE_PUBLIC => 'Public',
										 IMG_STATE_PRIVATE => 'Private',
										 IMG_STATE_REPO => 'Repository');

						foreach ($options as $key => $value) {
							$selected = "";
							if ($status == $key) {
								$selected = " selected";
							}

							echo "<option value=\"$key\"$selected>$value</option>";
						}
						?>
					</select>
				</span>

				<div class="innerBox" id="imgText">
					<textarea name="imgDescription" rows="5" id="imgDescription" placeholder="请在此输入内容..."><?php echo br2newline($imgObj->getText());?></textarea>
				</div>
				<div class="innerBox">
					<button id="btn-img-edit-submit" class="btn-submit" type="button">Update</button>
					<button class="btn-reset btn-smallpop-cancel" type="reset">Cancel</button>
				</div>
			</div>
		</form>
		</div>
	</div>
</div>